import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare } from "lucide-react";

interface Comment {
  id: number;
  user: string;
  text: string;
  date: string;
}

const mockComments: Comment[] = [
  {
    id: 1,
    user: "Ana Silva",
    text: "Importante alteração que afetará diretamente o setor de telecomunicações.",
    date: "2024-03-15",
  },
  {
    id: 2,
    user: "Carlos Santos",
    text: "Precisamos avaliar o impacto desta mudança nos contratos atuais.",
    date: "2024-03-14",
  },
];

export const CommentSection = () => {
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [newComment, setNewComment] = useState("");
  const { toast } = useToast();

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: comments.length + 1,
      user: "Usuário Atual",
      text: newComment,
      date: new Date().toISOString().split("T")[0],
    };

    setComments([comment, ...comments]);
    setNewComment("");
    
    toast({
      title: "Comentário adicionado",
      description: "Seu comentário foi publicado com sucesso.",
    });
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="h-5 w-5" />
        <h3 className="text-lg font-semibold">Comentários</h3>
      </div>

      <div className="mb-4">
        <Textarea
          placeholder="Adicione seu comentário..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="mb-2"
        />
        <Button onClick={handleAddComment}>Comentar</Button>
      </div>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="border-b border-gray-200 last:border-0 pb-4 last:pb-0"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="font-semibold">{comment.user}</span>
              <span className="text-sm text-gray-500">
                {new Date(comment.date).toLocaleDateString("pt-BR")}
              </span>
            </div>
            <p className="text-gray-700">{comment.text}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};