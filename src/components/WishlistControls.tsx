"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Grid, List } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function WishlistControls(props: { showViewToggle?: boolean }) {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const existingSearchParams = useSearchParams();

  const handleSearch = (search: string) => {
    const searchParams = new URLSearchParams(existingSearchParams);
    searchParams.set("search", search);
    const newUrl = `${pathname}?${searchParams.toString()}`;
    router.push(newUrl);
  };

  const handlePriceFilterChange = (filter: string) => {
    const searchParams = new URLSearchParams(existingSearchParams);

    if (filter === "all") {
      searchParams.delete("minPrice");
      searchParams.delete("maxPrice");
    } else if (filter === "under50") {
      searchParams.set("minPrice", "0");
      searchParams.set("maxPrice", "50");
    } else if (filter === "50to100") {
      searchParams.set("minPrice", "50");
      searchParams.set("maxPrice", "100");
    } else if (filter === "over100") {
      searchParams.set("minPrice", "100");
      searchParams.delete("maxPrice");
    }

    const newUrl = `${pathname}?${searchParams.toString()}`;
    router.push(newUrl);
  };

  const handleViewChange = (view: string) => {
    const searchParams = new URLSearchParams(existingSearchParams);
    searchParams.set("view", view);
    const newUrl = `${pathname}?${searchParams.toString()}`;
    router.push(newUrl);
  };

  return (
    <div className="flex items-center space-x-2 mb-6">
      <Input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          handleSearch(e.target.value);
        }}
        className="flex-grow"
      />
      <Select onValueChange={(value) => handlePriceFilterChange(value)}>
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="Price" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All prices</SelectItem>
          <SelectItem value="under50">Under $50</SelectItem>
          <SelectItem value="50to100">$50 - $100</SelectItem>
          <SelectItem value="over100">Over $100</SelectItem>
        </SelectContent>
      </Select>
      {props.showViewToggle ? (
        <ToggleGroup
          type="single"
          defaultValue="list"
          onValueChange={(value) => handleViewChange(value as "grid" | "list")}
        >
          <ToggleGroupItem value="list" aria-label="List view">
            <List className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="grid" aria-label="Grid view">
            <Grid className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      ) : null}
    </div>
  );
}
