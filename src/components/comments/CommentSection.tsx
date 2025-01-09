import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare } from "lucide-react";
import { api } from "@/services/api";

interface Comment {
  id: number;
  user: string;
  text: string;
  date: string;
}

export const CommentSection = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await api.getComments();
        setComments(response.data || []);
      } catch (error) {
        toast({
          title: "Erro",
          description: "Não foi possível carregar os comentários",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [toast]);

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

      {isLoading ? (
        <div className="text-center py-4">Carregando comentários...</div>
      ) : (
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
      )}
    </Card>
  );
};