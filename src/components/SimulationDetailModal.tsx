
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  TrendingUp, 
  Shield, 
  AlertTriangle, 
  ExternalLink,
  Clock,
  Globe,
  Users,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

interface SimulationDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  simulation: any;
}

export const SimulationDetailModal: React.FC<SimulationDetailModalProps> = ({
  isOpen,
  onClose,
  simulation
}) => {
  if (!simulation) return null;

  const getVerdictColor = (verdict: string) => {
    if (verdict.includes('Critical') || verdict.includes('Highly Likely')) return 'text-red-400';
    if (verdict.includes('Likely')) return 'text-orange-400';
    if (verdict.includes('Possible')) return 'text-yellow-400';
    return 'text-blue-400';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto cyber-card">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-cyan-400 neon-text">
            🧪 Crisis Simulation Analysis
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="cyber-card p-4"
            >
              <div className="flex items-center space-x-2 mb-2">
                <Brain className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-medium">AI Confidence</span>
              </div>
              <div className="text-2xl font-bold text-purple-400 mb-2">
                {simulation.confidence}%
              </div>
              <Progress value={simulation.confidence} className="h-2" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              delay={0.1}
              className="cyber-card p-4"
            >
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-5 h-5 text-orange-400" />
                <span className="text-sm font-medium">Timeline</span>
              </div>
              <div className="text-lg font-bold text-orange-400">
                {simulation.timeline}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              delay={0.2}
              className="cyber-card p-4"
            >
              <div className="flex items-center space-x-2 mb-2">
                <Globe className="w-5 h-5 text-green-400" />
                <span className="text-sm font-medium">Impact Scale</span>
              </div>
              <div className="text-sm font-medium text-green-400">
                {simulation.impact}
              </div>
            </motion.div>
          </div>

          {/* Verdict */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="cyber-card p-6 border-2 border-cyan-500/30"
          >
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-cyan-400" />
              <h3 className="text-xl font-bold text-cyan-400">Simulation Verdict</h3>
            </div>
            <div className={`text-2xl font-bold ${getVerdictColor(simulation.verdict)} mb-2`}>
              {simulation.verdict}
            </div>
            <p className="text-muted-foreground">
              Based on comprehensive AI analysis using {simulation.usedSonar ? 'Sonar AI' : 'Enhanced Intelligence'} systems
            </p>
          </motion.div>

          {/* Detailed Analysis Tabs */}
          <Tabs defaultValue="analysis" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
              <TabsTrigger value="flowchart">Response Flow</TabsTrigger>
              <TabsTrigger value="mitigations">Mitigations</TabsTrigger>
              <TabsTrigger value="evidence">Evidence</TabsTrigger>
              <TabsTrigger value="sources">Sources</TabsTrigger>
            </TabsList>

            <TabsContent value="analysis" className="space-y-4">
              {simulation.sonarAnalysis && (
                <div className="space-y-4">
                  <div className="cyber-card p-4">
                    <h4 className="font-semibold text-cyan-400 mb-3 flex items-center">
                      <Brain className="w-4 h-4 mr-2" />
                      AI Reasoning Chain
                    </h4>
                    <div className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {simulation.sonarAnalysis.reasoning}
                    </div>
                  </div>
                  
                  <div className="cyber-card p-4">
                    <h4 className="font-semibold text-cyan-400 mb-3 flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Research Intelligence
                    </h4>
                    <div className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {simulation.sonarAnalysis.research}
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="flowchart" className="space-y-4">
              <div className="cyber-card p-4">
                <h4 className="font-semibold text-cyan-400 mb-4">Crisis Response Protocol</h4>
                <div className="space-y-3">
                  {simulation.flowchart?.map((step: string, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-3 p-3 bg-slate-800/30 rounded-lg"
                    >
                      <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold">
                        {index + 1}
                      </div>
                      <span className="text-sm">{step}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="mitigations" className="space-y-4">
              <div className="cyber-card p-4">
                <h4 className="font-semibold text-cyan-400 mb-4 flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  Mitigation Strategies
                </h4>
                <div className="space-y-3">
                  {simulation.mitigations?.map((mitigation: string, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg"
                    >
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{mitigation}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="evidence" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="cyber-card p-4">
                  <h4 className="font-semibold text-green-400 mb-4 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Supporting Evidence
                  </h4>
                  <div className="space-y-2">
                    {simulation.supportingPoints?.map((point: string, index: number) => (
                      <div key={index} className="text-sm text-muted-foreground flex items-start space-x-2">
                        <span className="text-green-400 mt-1">•</span>
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="cyber-card p-4">
                  <h4 className="font-semibold text-red-400 mb-4 flex items-center">
                    <XCircle className="w-4 h-4 mr-2" />
                    Counter Evidence
                  </h4>
                  <div className="space-y-2">
                    {simulation.counterPoints?.map((point: string, index: number) => (
                      <div key={index} className="text-sm text-muted-foreground flex items-start space-x-2">
                        <span className="text-red-400 mt-1">•</span>
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="sources" className="space-y-4">
              <div className="cyber-card p-4">
                <h4 className="font-semibold text-cyan-400 mb-4 flex items-center">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Intelligence Sources
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {simulation.sources?.map((source: string, index: number) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => window.open(source.startsWith('http') ? source : `https://${source}`, '_blank')}
                      className="flex items-center justify-between p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg hover:border-cyan-500/50 transition-colors text-left"
                    >
                      <span className="text-sm text-cyan-400 truncate">{source}</span>
                      <ExternalLink className="w-4 h-4 text-cyan-400 flex-shrink-0 ml-2" />
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Deep Analysis Links */}
              {simulation.deepAnalysisLinks && (
                <div className="cyber-card p-4">
                  <h4 className="font-semibold text-purple-400 mb-4">Deep Analysis Modules</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {simulation.deepAnalysisLinks.map((link: any, index: number) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="cyber-button text-left h-auto p-3"
                        onClick={() => {
                          // Implement deep analysis navigation
                          console.log('Navigate to deep analysis:', link.type);
                        }}
                      >
                        <div>
                          <div className="font-medium text-purple-400">{link.title}</div>
                          <div className="text-xs text-muted-foreground">{link.description}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SimulationDetailModal;
