import { AuthButton } from "@/components/auth/AuthButton";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle, Clock, Star, Zap } from "lucide-react";

const AuroraBackground = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1.5 }}
    className="absolute top-0 left-0 w-full h-full overflow-hidden z-0"
  >
    <div className="absolute w-[1000px] h-[1000px] bg-[radial-gradient(circle_at_center,_var(--color-primary)_0,_transparent_50%)] -top-1/4 -left-1/4 opacity-20 animate-pulse" />
    <div className="absolute w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_var(--color-secondary)_0,_transparent_60%)] -bottom-1/4 -right-1/4 opacity-20 animate-pulse animation-delay-4000" />
  </motion.div>
);

export default function Landing() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-background text-foreground dark">
      <AuroraBackground />
      
      <div className="relative z-10">
        {/* Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 py-6 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <CheckCircle className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold tracking-tight">TodoFlow</span>
          </div>
          <AuthButton
            trigger={
              <Button size="lg" variant="outline" className="rounded-full bg-transparent backdrop-blur-sm border-2 border-primary/50 hover:bg-primary/10 hover:text-primary-foreground transition-all">
                Get Started
              </Button>
            }
          />
        </motion.nav>

        {/* Hero Section */}
        <div className="container mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8">
              Organize Your Life
              <br />
              <span className="text-primary">Effortlessly</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              The most intuitive todo app that adapts to your workflow. 
              Capture ideas, set priorities, and achieve your goals with elegant simplicity.
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05, filter: 'brightness(1.2)' }}
              whileTap={{ scale: 0.95 }}
            >
              <AuthButton 
                trigger={
                  <Button size="lg" className="text-lg px-10 py-7 rounded-full shadow-[0_0_20px_var(--primary)] hover:shadow-[0_0_30px_var(--primary)] transition-shadow">
                    Start Organizing Today
                  </Button>
                }
              />
            </motion.div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid md:grid-cols-3 gap-8 mt-32 max-w-6xl mx-auto"
          >
            {[
              { icon: Zap, title: "Lightning Fast", text: "Add and organize todos in seconds. Our streamlined interface keeps you focused on what matters." },
              { icon: Star, title: "Smart Priorities", text: "Set priorities and due dates to stay on top of your most important tasks." },
              { icon: Clock, title: "Real-time Sync", text: "Access your todos anywhere. Changes sync instantly across all your devices." }
            ].map((feature, i) => (
              <div key={i} className="text-center p-8 rounded-2xl bg-card/80 backdrop-blur-md border border-border hover:border-primary/50 transition-colors shadow-lg">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-primary/20">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.text}
                </p>
              </div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-center mt-32 p-16 rounded-3xl bg-card/80 backdrop-blur-md border border-border"
          >
            <h2 className="text-4xl font-bold tracking-tight mb-6">
              Ready to get organized?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of users who have transformed their productivity with TodoFlow.
            </p>
            <motion.div
              whileHover={{ scale: 1.05, filter: 'brightness(1.2)' }}
              whileTap={{ scale: 0.95 }}
            >
              <AuthButton 
                trigger={
                  <Button size="lg" className="text-lg px-8 py-6 rounded-full shadow-[0_0_20px_var(--primary)] hover:shadow-[0_0_30px_var(--primary)] transition-shadow">
                    Get Started - It's Free
                  </Button>
                }
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="border-t border-border mt-20">
          <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
            <p>&copy; 2024 TodoFlow. Built with ❤️ for productivity enthusiasts.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}