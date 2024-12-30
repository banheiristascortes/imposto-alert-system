interface TimelineItemProps {
  estado: string;
  tipo: string;
  descricao: string;
  data: string;
}

export const TimelineItem = ({ estado, tipo, descricao, data }: TimelineItemProps) => {
  return (
    <div className="relative pl-4 pb-4 border-l border-primary-200 last:border-0">
      <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full bg-primary-500" />
      <div className="mb-2">
        <span className="inline-flex items-center rounded-md bg-primary-100 px-2 py-1 text-xs font-medium text-primary-700">
          {estado} - {tipo}
        </span>
        <span className="ml-2 text-sm text-gray-500">
          {new Date(data).toLocaleDateString("pt-BR")}
        </span>
      </div>
      <p className="text-sm text-gray-600">{descricao}</p>
    </div>
  );
};