import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Car, CheckCircle2, Clock, Plus, ArrowRight } from "lucide-react";
import { formatRideStatus, formatDateTime } from "@/lib/ride-helpers";

export default async function AccountDashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const userId = session.user.id;

  const [totalRides, upcomingRides, completedRides, recentRides] =
    await Promise.all([
      db.ride.count({ where: { userId } }),
      db.ride.count({
        where: {
          userId,
          pickupDateTime: { gt: new Date() },
          status: { in: ["CONFIRMED", "UNDER_REVIEW", "NEW_REQUEST"] },
        },
      }),
      db.ride.count({
        where: { userId, status: "COMPLETED" },
      }),
      db.ride.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          publicId: true,
          pickupAddress: true,
          dropoffAddress: true,
          pickupDateTime: true,
          status: true,
          transportType: true,
        },
      }),
    ]);

  const displayName = session.user.name || "there";

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-primary">
          Welcome back, {displayName}
        </h1>
        <p className="mt-1 text-muted-foreground">
          Here is an overview of your ride activity.
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Rides
            </CardTitle>
            <Car className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{totalRides}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Upcoming Rides
            </CardTitle>
            <Clock className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {upcomingRides}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completed Rides
            </CardTitle>
            <CheckCircle2 className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">
              {completedRides}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-3">
        <Button
          className="h-11 px-6 bg-primary text-white hover:bg-primary-dark shadow-sm"
          render={<Link href="/book" />}
        >
          <Plus className="size-4" />
          Book a New Ride
        </Button>
        <Button
          variant="outline"
          className="h-11 px-6"
          render={<Link href="/account/rides" />}
        >
          View All Rides
          <ArrowRight className="size-4" />
        </Button>
      </div>

      {/* Recent rides */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Rides</CardTitle>
        </CardHeader>
        <CardContent>
          {recentRides.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Car className="mb-4 size-12 text-muted-foreground/40" />
              <h3 className="text-lg font-semibold text-primary">
                No rides yet
              </h3>
              <p className="mt-1 mb-4 max-w-sm text-sm text-muted-foreground">
                You haven&apos;t booked any rides yet. Book your first ride and
                we will get you where you need to go.
              </p>

              <Button
                className="h-11 px-6 bg-primary text-white hover:bg-primary-dark shadow-sm"
                render={<Link href="/book" />}
              >
                <Plus className="size-4" />
                Book Your First Ride
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {recentRides.map((ride : any) => {
                const statusConfig = formatRideStatus(ride.status);
                return (
                  <Link
                    key={ride.id}
                    href={`/account/rides/${ride.id}`}
                    className="flex flex-col gap-2 rounded-lg border border-border p-3 transition-colors hover:bg-muted/50 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {formatDateTime(ride.pickupDateTime)}
                        </span>
                        <Badge
                          className={`${statusConfig.className} border-0 text-xs`}
                        >
                          {statusConfig.label}
                        </Badge>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium text-foreground">
                          {ride.pickupAddress}
                        </span>
                        <span className="mx-2 text-muted-foreground">
                          &rarr;
                        </span>
                        <span className="text-muted-foreground">
                          {ride.dropoffAddress}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="hidden size-4 shrink-0 text-muted-foreground sm:block" />
                  </Link>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
