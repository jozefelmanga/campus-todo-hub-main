import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";
import { GraduationCap, Trash2 } from "lucide-react";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Complete project proposal", completed: false },
    { id: "2", title: "Review presentation slides", completed: false },
    { id: "3", title: "Submit assignment", completed: false },
    { id: "4", title: "Attend team meeting", completed: false },
    { id: "5", title: "Prepare for exam", completed: false },
    { id: "6", title: "Complete online course module", completed: false },
    { id: "7", title: "Schedule tutoring session", completed: false },
    { id: "8", title: "Organize study materials", completed: false },
    { id: "9", title: "Research for upcoming paper", completed: false },
    { id: "10", title: "Contact professor for clarification", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/login");
  };

  const handleAddTask = () => {
    if (!newTask.trim()) {
      toast({
        title: "Error",
        description: "Task cannot be empty",
        variant: "destructive",
      });
      return;
    }

    const task: Task = {
      id: Date.now().toString(),
      title: newTask,
      completed: false,
    };

    setTasks([task, ...tasks]);
    setNewTask("");
    setIsAdding(false);
    toast({
      title: "Task added",
      description: "Your task has been added successfully",
    });
  };

  const handleToggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast({
      title: "Task deleted",
      description: "The task has been removed",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated onLogout={handleLogout} />

      <main className="container mx-auto px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 flex items-center gap-3">
            <GraduationCap className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">My Tasks</h1>
          </div>

          <div className="mb-8">
            {isAdding ? (
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Add a task"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddTask()}
                  className="bg-[hsl(var(--input-bg))]"
                  autoFocus
                />
                <div className="flex gap-2">
                  <Button onClick={handleAddTask}>Add Task</Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsAdding(false);
                      setNewTask("");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <Button onClick={() => setIsAdding(true)} className="w-full sm:w-auto">
                Add New Task
              </Button>
            )}
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Tasks</h2>
            
            <div className="space-y-2">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="group flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-colors hover:bg-[hsl(var(--task-hover))]"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <Checkbox
                      id={task.id}
                      checked={task.completed}
                      onCheckedChange={() => handleToggleTask(task.id)}
                    />
                    <label
                      htmlFor={task.id}
                      className={`cursor-pointer text-base ${
                        task.completed
                          ? "text-muted-foreground line-through"
                          : "text-foreground"
                      }`}
                    >
                      {task.title}
                    </label>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteTask(task.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
