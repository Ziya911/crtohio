import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import type { Ride } from '@prisma/client'
import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Car, Plus } from "lucide-react";
import { Pagination } from "@/components/shared/Pagination";
import {
  formatRideStatus,
  formatTransportType,
  formatDateTime,
  formatPrice,
} from "@/lib/ride-helpers";

const ITEMS_PER_PAGE = 10;

export default async function UserRidesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params.page || "1", 10) || 1);

  const where = { userId: session.user.id };

  const [rides, totalCount] = await Promise.all([
    db.ride.findMany({
      where,
      orderBy: { pickupDateTime: "desc" },
      select: {
        id: true,
        publicId: true,
        pickupAddress: true,
        dropoffAddress: true,
        pickupDateTime: true,
        status: true,
        transportType: true,
        estimatedPrice: true,
        finalPrice: true,
      },
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    }),
    db.ride.count({ where }),
  ]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  type RideRow = Pick<
    Ride,
    | 'id'
    | 'publicId'
    | 'pickupAddress'
    | 'dropoffAddress'
    | 'pickupDateTime'
    | 'status'
    | 'transportType'
    | 'estimatedPrice'
    | 'finalPrice'
  >

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">My Rides</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            View all of your ride requests and their current status.
          </p>
        </div>
        <Button
          className="h-11 px-6 bg-primary text-white hover:bg-primary-dark shadow-sm"
          render={<Link href="/book" />}
        >
          <Plus className="size-4" />
          Book a Ride
        </Button>
      </div>

      {rides.length === 0 && currentPage === 1 ? (
        <Card>
          <CardContent className="py-12">
            <div className="flex flex-col items-center justify-center text-center">
              <Car className="mb-4 size-12 text-muted-foreground/40" />
              <h3 className="text-lg font-semibold text-primary">
                No rides yet
              </h3>
              <p className="mt-1 mb-4 max-w-sm text-sm text-muted-foreground">
                You haven&apos;t booked any rides yet. Get started by booking
                your first ride.
              </p>

              <Button
                className="h-11 px-6 bg-primary text-white hover:bg-primary-dark shadow-sm"
                render={<Link href="/book" />}
              >
                <Plus className="size-4" />
                Book Your First Ride
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>All Rides ({totalCount})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Pickup</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Drop-off
                  </TableHead>
                  <TableHead className="hidden sm:table-cell">Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden sm:table-cell text-right">
                    Est. Price
                  </TableHead>
                  <TableHead className="hidden sm:table-cell text-right">
                    Final Price
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rides.map((ride: RideRow) => {
                  const statusConfig = formatRideStatus(ride.status);
                  return (
                    <TableRow key={ride.id}>
                      <TableCell>
                        <Link
                          href={`/account/rides/${ride.id}`}
                          className="font-medium text-primary hover:underline"
                        >
                          {formatDateTime(ride.pickupDateTime)}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <span className="max-w-[200px] truncate block text-sm">
                          {ride.pickupAddress}
                        </span>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <span className="max-w-[200px] truncate block text-sm">
                          {ride.dropoffAddress}
                        </span>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <span className="text-sm">
                          {formatTransportType(ride.transportType)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${statusConfig.className} border-0 text-xs`}
                        >
                          {statusConfig.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-right">
                        <span className="text-sm font-medium">
                          {formatPrice(ride.estimatedPrice)}
                        </span>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-right">
                        <span className="text-sm font-medium text-primary">
                          {formatPrice(ride.finalPrice)}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            <div className="px-6 pb-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalCount}
                basePath="/account/rides"
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
