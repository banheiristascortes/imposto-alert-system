import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RecentChange {
  id: number;
  estado: string;
  tipo: string;
  descricao: string;
  data: string;
  status: "pending" | "approved" | "rejected";
}

interface RecentChangesTableProps {
  changes: RecentChange[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const getStatusColor = (status: RecentChange["status"]) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "approved":
      return "bg-green-100 text-green-800";
    case "rejected":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusText = (status: RecentChange["status"]) => {
  switch (status) {
    case "pending":
      return "Pendente";
    case "approved":
      return "Aprovado";
    case "rejected":
      return "Rejeitado";
    default:
      return status;
  }
};

export const RecentChangesTable = ({
  changes,
  currentPage,
  totalPages,
  onPageChange,
}: RecentChangesTableProps) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Alterações Recentes</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Estado</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {changes.map((change) => (
            <TableRow key={change.id}>
              <TableCell>{change.estado}</TableCell>
              <TableCell>{change.tipo}</TableCell>
              <TableCell>{change.descricao}</TableCell>
              <TableCell>
                {new Date(change.data).toLocaleDateString("pt-BR")}
              </TableCell>
              <TableCell>
                <Badge className={getStatusColor(change.status)}>
                  {getStatusText(change.status)}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <div className="mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(Math.max(1, currentPage - 1));
                  }}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    isActive={page === currentPage}
                    onClick={(e) => {
                      e.preventDefault();
                      onPageChange(page);
                    }}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(Math.min(totalPages, currentPage + 1));
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </Card>
  );
};