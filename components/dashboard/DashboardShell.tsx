"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Car,
  User,
  Settings,
  Users,
  LogOut,
  Menu,
  X,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LOGO_PATH, SITE_NAME } from "@/lib/constants";

type UserData = {
  id: string;
  name: string | null;
  email: string;
  role: "ADMIN" | "USER";
};

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const USER_NAV: NavItem[] = [
  {
    label: "Dashboard",
    href: "/account",
    icon: <LayoutDashboard className="size-4" />,
  },
  {
    label: "My Rides",
    href: "/account/rides",
    icon: <Car className="size-4" />,
  },
  {
    label: "Profile",
    href: "/account/profile",
    icon: <User className="size-4" />,
  },
];

const ADMIN_NAV: NavItem[] = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: <LayoutDashboard className="size-4" />,
  },
  {
    label: "All Rides",
    href: "/admin/rides",
    icon: <Car className="size-4" />,
  },
  { label: "Users", href: "/admin/users", icon: <Users className="size-4" /> },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: <Settings className="size-4" />,
  },
];

function getInitials(name: string | null, email: string): string {
  if (name) {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }
  return email.slice(0, 2).toUpperCase();
}

export function DashboardShell({
  user,
  children,
}: {
  user: UserData;
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSignOutDialog, setShowSignOutDialog] = useState(false);
  const pathname = usePathname();

  const isAdmin = user.role === "ADMIN";
  const initials = getInitials(user.name, user.email);
  const displayName = user.name || user.email;

  function isActive(href: string): boolean {
    if (href === "/account" || href === "/admin") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  }

  function handleSignOut() {
    signOut({ callbackUrl: "/" });
  }

  return (
    <div className="flex h-screen overflow-hidden bg-muted/30">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-border bg-card transition-transform duration-200 lg:static lg:z-auto lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Logo area */}
        <div className="flex h-18 items-center justify-between px-4">
          <Link href="/" className="flex flex-1 items-center justify-center">
            <Image
              src={LOGO_PATH}
              alt={SITE_NAME}
              width={180}
              height={60}
              className="h-16 w-auto"
            />
          </Link>
          <button
            className="lg:hidden flex items-center justify-center size-8 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="size-4" />
          </button>
        </div>

        <Separator />

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <div className="space-y-1">
            {(isAdmin ? ADMIN_NAV : USER_NAV).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-primary text-white"
                    : "text-muted-foreground hover:bg-primary/10 hover:text-primary",
                )}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* User info at bottom */}
        <div className="border-t border-border p-3">
          <div className="flex items-center gap-3 rounded-lg px-2 py-2">
            <Avatar size="default">
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium text-foreground">
                {displayName}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {user.email}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowSignOutDialog(true)}
            className="mt-1 w-full flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium text-muted-foreground hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut className="size-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top header bar */}
        <header className="flex h-14 shrink-0 items-center gap-4 border-b border-border bg-card px-4 lg:px-6">
          <button
            className="lg:hidden flex items-center justify-center size-9 rounded-lg border border-border hover:bg-primary hover:text-white hover:border-primary transition-colors"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu className="size-5" />
          </button>

          <div className="flex-1" />

          {/* User dropdown in header */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring">
              <Avatar size="sm">
                <AvatarFallback className="text-xs">{initials}</AvatarFallback>
              </Avatar>
              <span className="hidden font-medium sm:inline-block">
                {displayName}
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={8} className="w-72">
              <DropdownMenuGroup>
                <DropdownMenuLabel className="px-3 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar size="default">
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-semibold truncate">
                        {displayName}
                      </span>
                      <span className="text-xs text-muted-foreground truncate">
                        {user.email}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup className="p-1">
                <DropdownMenuItem
                  render={<Link href={isAdmin ? "/admin" : "/account"} />}
                  className="px-3 py-2.5 rounded-md"
                >
                  <LayoutDashboard className="size-4" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem
                  render={<Link href="/account/profile" />}
                  className="px-3 py-2.5 rounded-md"
                >
                  <User className="size-4" />
                  Profile
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup className="p-1">
                <DropdownMenuItem
                  onClick={() => setShowSignOutDialog(true)}
                  className="px-3 py-2.5 rounded-md text-red-600 focus:text-red-600 focus:bg-red-50"
                >
                  <LogOut className="size-4 focus:text-red-600" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>

      {/* Sign Out Confirmation Dialog */}
      <Dialog open={showSignOutDialog} onOpenChange={setShowSignOutDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="size-6 text-red-600" />
            </div>
            <DialogTitle className="text-center">Sign Out</DialogTitle>
            <DialogDescription className="text-center">
              Are you sure you want to sign out? You will need to log in again
              to access your account.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-row gap-3 sm:justify-center">
            <Button
              variant="outline"
              onClick={() => setShowSignOutDialog(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleSignOut}
              className="flex-1"
            >
              <LogOut className="size-4" />
              Sign Out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
