import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { DataTable } from "../data-table";

const data = [
  { id: "a", name: "Alpha" },
  { id: "b", name: "Bravo" },
];
const columns: ColumnDef<(typeof data)[number], unknown>[] = [
  {
    id: "name",
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => <a href={`/items/${row.id}`}>{row.original.name}</a>,
  },
];
function Example() {
  const [expandedRowId, onExpandedRowChange] = useState<string | null>(null);
  return (
    <DataTable
      columns={columns}
      data={data}
      getRowId={(row) => row.id}
      enableColumnResizing={false}
      rowExpansion={{
        expandedRowId,
        onExpandedRowChange,
        getLabel: (row) => `Work for ${row.original.name}`,
        renderDetails: (row) => (
          <section>Evidence for {row.original.name}</section>
        ),
      }}
    />
  );
}
afterEach(cleanup);
describe("inline row details", () => {
  it("renders the page without fixed-height virtualization and expands only the chosen row", () => {
    render(<Example />);
    expect(screen.getByRole("link", { name: "Alpha" })).toBeTruthy();
    expect(screen.getByRole("columnheader", { name: "Name" })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Work for Alpha" }));
    expect(screen.getByText("Evidence for Alpha")).toBeTruthy();
    expect(
      screen
        .getByRole("button", { name: "Work for Alpha" })
        .getAttribute("aria-expanded"),
    ).toBe("true");
    fireEvent.click(screen.getByRole("button", { name: "Work for Bravo" }));
    expect(screen.queryByText("Evidence for Alpha")).toBeNull();
    expect(screen.getByText("Evidence for Bravo")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Work for Bravo" }));
    expect(screen.queryByText("Evidence for Bravo")).toBeNull();
  });
  it("toggles from row whitespace but not from a link inside the row", () => {
    render(<Example />);
    const link = screen.getByRole("link", { name: "Alpha" });
    fireEvent.click(link);
    expect(screen.queryByText("Evidence for Alpha")).toBeNull();
    fireEvent.click(link.closest("[data-expansion-row]")!);
    expect(screen.getByText("Evidence for Alpha")).toBeTruthy();
  });
});
