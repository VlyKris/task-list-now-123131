import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { motion } from "framer-motion";
import { Calendar, Clock, Edit, MoreHorizontal, Trash2 } from "lucide-react";
import { useMutation } from "convex/react";
import { toast } from "sonner";

interface TodoItemProps {
  todo: {
    _id: Id<"todos">;
    title: string;
    description?: string;
    completed: boolean;
    priority: "low" | "medium" | "high";
    dueDate?: number;
    _creationTime: number;
  };
  onEdit: (todo: any) => void;
}

const priorityColors = {
  low: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  high: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
};

export function TodoItem({ todo, onEdit }: TodoItemProps) {
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);

  const handleToggle = async () => {
    try {
      await toggleTodo({ id: todo._id });
      toast.success(todo.completed ? "Todo marked as pending" : "Todo completed!");
    } catch (error) {
      toast.error("Failed to update todo");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo({ id: todo._id });
      toast.success("Todo deleted");
    } catch (error) {
      toast.error("Failed to delete todo");
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const isOverdue = todo.dueDate && todo.dueDate < Date.now() && !todo.completed;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`group p-4 rounded-xl border transition-all hover:shadow-lg hover:border-primary/50 ${
        todo.completed 
          ? "bg-card/30 border-border/50" 
          : "bg-card/80 backdrop-blur-md border-border"
      }`}
    >
      <div className="flex items-start gap-4">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={handleToggle}
          className="mt-1 w-5 h-5 rounded-md"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={`font-medium transition-colors ${todo.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
              {todo.title}
            </h3>
          </div>
          <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${priorityColors[todo.priority]}`}>
            {todo.priority}
          </span>
          
          {todo.description && (
            <p className={`text-sm mt-2 transition-colors ${todo.completed ? "line-through text-muted-foreground/70" : "text-muted-foreground"}`}>
              {todo.description}
            </p>
          )}
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground mt-3">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatDate(todo._creationTime)}
            </div>
            {todo.dueDate && (
              <div className={`flex items-center gap-1 ${isOverdue ? "text-red-500" : ""}`}>
                <Calendar className="h-3 w-3" />
                Due {formatDate(todo.dueDate)}
                {isOverdue && <span className="text-red-500 font-medium">• Overdue</span>}
              </div>
            )}
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(todo)} className="cursor-pointer">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete} className="cursor-pointer text-destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.div>
  );
}