import Link from "next/link";
import {
  Plus,
  Users,
  Clock,
  Archive,
  PenToolIcon as Tool,
  Download,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export function Sidebar({ count }: { count: number }) {
  return (
    <div className="w-64 border-r h-[calc(100vh-3.5rem)] fixed left-0 top-14 bg-background">
      <ScrollArea className="h-full py-4">
        <div className="px-4 space-y-4">
          <Button asChild className="w-full justify-start gap-2">
            <Link href="/contacts/new">
              <Plus className="h-4 w-4" />
              Create contact
            </Link>
          </Button>

          <nav className="space-y-1">
            <Button
              variant="ghost"
              asChild
              className="w-full justify-start gap-2"
            >
              <Link href="/contacts">
                <Users className="h-4 w-4" />
                Contacts
                {count > 0 && (
                  <span className="ml-auto text-muted-foreground">{count}</span>
                )}
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Clock className="h-4 w-4" />
              Frequent
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Archive className="h-4 w-4" />
              Other contacts
            </Button>
          </nav>

          <div className="space-y-1">
            <h2 className="text-sm font-semibold px-2">Fix & manage</h2>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Tool className="h-4 w-4" />
              Merge & fix
              <span className="ml-auto bg-red-100 text-red-600 px-1.5 rounded-full text-xs">
                20
              </span>
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Download className="h-4 w-4" />
              Import
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Trash2 className="h-4 w-4" />
              Trash
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
