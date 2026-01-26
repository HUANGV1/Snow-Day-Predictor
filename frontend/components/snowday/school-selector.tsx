"use client";

import { useState } from "react";
import { Check, ChevronsUpDown, MapPin, School } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { schoolBoards } from "@/lib/mock-data";

interface SchoolSelectorProps {
  onSelect?: (board: typeof schoolBoards[0]) => void;
}

export function SchoolSelector({ onSelect }: SchoolSelectorProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(schoolBoards[0]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 text-muted-foreground">
        <MapPin className="h-4 w-4" />
        <span className="text-sm">{selected.city}</span>
      </div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between w-full max-w-md bg-secondary border-border hover:bg-secondary/80"
          >
            <div className="flex items-center gap-2">
              <School className="h-4 w-4 text-muted-foreground" />
              <span className="truncate">{selected.name}</span>
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full max-w-md p-0" align="start">
          <Command>
            <CommandInput placeholder="Search school boards..." />
            <CommandList>
              <CommandEmpty>No school board found.</CommandEmpty>
              <CommandGroup>
                {schoolBoards.map((board) => (
                  <CommandItem
                    key={board.id}
                    value={board.name}
                    onSelect={() => {
                      setSelected(board);
                      setOpen(false);
                      onSelect?.(board);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selected.id === board.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <div className="flex flex-col">
                      <span>{board.name}</span>
                      <span className="text-xs text-muted-foreground">{board.city}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
