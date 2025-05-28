
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  Brain, 
  Sparkles, 
  ExternalLink,
  Loader2,
  Search,
  TrendingUp,
  AlertTriangle,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SonarAnalysisService from '../services/sonarAnalysisService';
import { useToast } from '@/hooks/use-toast';

interface CrisisDetailPageProps {
  crisisStep: string;
  analysisType: 'root_cause' | 'escalation_factor' | 'cascading_effect' | 'historical_precedent';
  onBack: () => void;
}

export const CrisisDetailPage = ({ crisisStep, analysisType, onBack }: CrisisDetailPageProps) => {
  const [analysis, setAnalysis] = useState<string>('');
  const [sources, setSources] = useState<string[]>([]);
  const [confidence, setConfidence] = useState<number>(0);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [currentStep, setCurrentStep] = useState('initializing');
  const { toast } = useToast();

  const analysisSteps = [
    { id: 'initializing', label: 'Initializing Sonar AI', duration: 1000 },
    { id: 'deep_search', label: 'Conducting Deep Search', duration: 2000 },
    { id: 'reasoning', label: 'Sonar Reasoning Analysis', duration: 2500 },
    { id: 'synthesis', label: 'Synthesizing Intelligence', duration: 1500 },
    { id: 'complete', label: 'Analysis Complete', duration: 500 }
  ];

  const analyzeWithSonar = async () => {
    setIsAnalyzing(true);
    setCurrentStep('initializing');
    
    toast({
      title: "🧠 Sonar AI Activated",
      description: "Conducting deep analysis with real-time intelligence...",
    });

    // Simulate progressive analysis steps
    for (const step of analysisSteps) {
      setCurrentStep(step.id);
      await new Promise(resolve => setTimeout(resolve, step.duration));
    }

    try {
      const result = await SonarAnalysisService.analyzeComplexCause(crisisStep, analysisType);
      
      if (result.success) {
        await typeWriterEffect(result.analysis, setAnalysis);
        setSources(result.sources);
        setConfidence(result.confidence);
        setRecommendations(result.recommendations);
        setHasAnalyzed(true);
        
        toast({
          title: "✅ Analysis Complete",
          description: `Sonar AI analysis completed with ${result.confidence}% confidence`,
        });
      } else {
        throw new Error('Analysis failed');
      }
    } catch (error) {
      toast({
        title: "❌ Analysis Failed",
        description: "Using cached intelligence for analysis.",
        variant: "destructive",
      });
      
      const fallbackResult = SonarAnalysisService.generateFallbackAnalysis(crisisStep, analysisType);
      await typeWriterEffect(fallbackResult.analysis, setAnalysis);
      setSources(fallbackResult.sources);
      setConfidence(fallbackResult.confidence);
      setRecommendations(fallbackResult.recommendations);
      setHasAnalyzed(true);
    } finally {
      setIsAnalyzing(false);
      setCurrentStep('complete');
    }
  };

  const typeWriterEffect = async (text: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
    setter('');
    const words = text.split(' ');
    
    for (let i = 0; i <= words.length; i++) {
      const partial = words.slice(0, i).join(' ');
      setter(partial);
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  };

  const getAnalysisTypeInfo = () => {
    const types = {
      'root_cause': {
        title: 'Root Cause Analysis',
        icon: '🔍',
        color: 'text-orange-400',
        bgColor: 'bg-orange-500/10',
        borderColor: 'border-orange-500/30',
        description: 'Deep investigation into fundamental causes and origins'
      },
      'escalation_factor': {
        title: 'Escalation Factor Analysis', 
        icon: '⚡',
        color: 'text-red-400',
        bgColor: 'bg-red-500/10',
        borderColor: 'border-red-500/30',
        description: 'Analysis of factors that could amplify the crisis'
      },
      'cascading_effect': {
        title: 'Cascading Effect Analysis',
        icon: '🌊',
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-500/10',
        borderColor: 'border-yellow-500/30',
        description: 'Examination of potential secondary and tertiary impacts'
      },
      'historical_precedent': {
        title: 'Historical Precedent Analysis',
        icon: '📚',
        color: 'text-purple-400',
        bgColor: 'bg-purple-500/10',
        borderColor: 'border-purple-500/30',
        description: 'Comparison with similar past events and outcomes'
      }
    };
    
    return types[analysisType];
  };

  const getCurrentStepInfo = () => {
    const step = analysisSteps.find(s => s.id === currentStep);
    return step || analysisSteps[0];
  };

  const typeInfo = getAnalysisTypeInfo();
  const stepInfo = getCurrentStepInfo();

  useEffect(() => {
    if (!hasAnalyzed) {
      analyzeWithSonar();
    }
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-background p-6"
    >
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <Card className="cyber-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <Button 
                onClick={onBack}
                variant="outline"
                className="cyber-button"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Simulation
              </Button>
              
              <Badge className={`${typeInfo.bgColor} ${typeInfo.color} ${typeInfo.borderColor} text-lg px-4 py-2`}>
                {typeInfo.icon} {typeInfo.title}
              </Badge>
            </div>

            <h1 className="text-3xl font-bold text-cyan-400 neon-text mb-4">
              Sonar AI Deep Intelligence Analysis
            </h1>
            
            <div className={`p-6 rounded-lg ${typeInfo.bgColor} border ${typeInfo.borderColor}`}>
              <h2 className="text-xl font-medium mb-3 flex items-center">
                <Search className="w-5 h-5 mr-2" />
                Subject of Analysis:
              </h2>
              <p className="text-foreground text-lg leading-relaxed">{crisisStep}</p>
              <p className="text-muted-foreground mt-2">{typeInfo.description}</p>
            </div>
          </CardContent>
        </Card>

        {/* Analysis Progress */}
        <AnimatePresence>
          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Card className="cyber-card border-2 border-cyan-500/50">
                <CardContent className="p-8">
                  <div className="text-center space-y-6">
                    <Brain className="w-16 h-16 text-cyan-400 mx-auto animate-pulse" />
                    <div>
                      <h3 className="text-2xl font-bold text-cyan-400 mb-2">
                        Sonar AI Processing
                      </h3>
                      <p className="text-lg text-cyan-300 mb-1">
                        {stepInfo.label}
                      </p>
                      <p className="text-muted-foreground">
                        Analyzing global data sources and intelligence networks...
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <Progress value={85} className="w-full max-w-md mx-auto h-3" />
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                        {['Sonar Search', 'Reasoning Engine', 'Evidence Synthesis', 'Intelligence Fusion'].map((tech, index) => (
                          <div key={tech} className="text-center">
                            <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${index <= analysisSteps.findIndex(s => s.id === currentStep) ? 'bg-green-400 animate-pulse' : 'bg-gray-600'}`} />
                            <span className="text-xs text-muted-foreground">{tech}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Analysis Results */}
        <AnimatePresence>
          {hasAnalyzed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-3 gap-6"
            >
              {/* Main Analysis */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="cyber-card">
                  <CardHeader>
                    <CardTitle className="text-cyan-400 flex items-center">
                      <Brain className="w-5 h-5 mr-2" />
                      Sonar AI Analysis Results
                      <Badge className="ml-auto bg-green-500/20 text-green-400">
                        {confidence}% Confidence
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-invert max-w-none">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="text-foreground leading-relaxed text-lg"
                      >
                        {analysis}
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                {recommendations.length > 0 && (
                  <Card className="cyber-card">
                    <CardHeader>
                      <CardTitle className="text-orange-400 flex items-center">
                        <AlertTriangle className="w-5 h-5 mr-2" />
                        Strategic Recommendations
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {recommendations.map((rec, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/30"
                          >
                            <div className="flex items-start">
                              <span className="text-orange-400 font-bold mr-3">{index + 1}.</span>
                              <span className="text-foreground">{rec}</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Intelligence Sources */}
                <Card className="cyber-card">
                  <CardHeader>
                    <CardTitle className="text-cyan-400 flex items-center">
                      <Search className="w-5 h-5 mr-2" />
                      Intelligence Sources
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {sources.map((source, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                          className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/30 cursor-pointer hover:border-cyan-500/50 transition-colors"
                          onClick={() => window.open(`https://${source}`, '_blank')}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-cyan-400 font-medium text-sm">{source}</span>
                            <ExternalLink className="w-4 h-4 text-cyan-400" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Analysis Metrics */}
                <Card className="cyber-card">
                  <CardHeader>
                    <CardTitle className="text-purple-400 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Analysis Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Confidence Level</span>
                        <span className="text-cyan-400">{confidence}%</span>
                      </div>
                      <Progress value={confidence} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Data Quality</span>
                        <span className="text-green-400">94%</span>
                      </div>
                      <Progress value={94} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Source Reliability</span>
                        <span className="text-yellow-400">87%</span>
                      </div>
                      <Progress value={87} className="h-2" />
                    </div>

                    <div className="pt-4 border-t border-border/50">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Analysis Time</span>
                        <div className="flex items-center text-cyan-400">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>2.3 min</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
