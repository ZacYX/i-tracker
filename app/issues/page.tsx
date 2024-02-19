import { Button } from "@radix-ui/themes";
import Link from "next/link";

export default function IssuePage() {
  return (
    <div>
      <Button size="4" variant="solid">
        <Link href="/issues/new">
          New Issue
        </Link> 
      </Button>

    </div>
  )
}