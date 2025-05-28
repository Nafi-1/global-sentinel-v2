
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Star, Target, Brain, Shield, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { threatsApi } from '../api/threats';
import { motion, AnimatePresence } from 'framer-motion';

interface ValidationResult {
  verification: {
    verdict: string;
    confidence: number;
    reasoning: string;
    supportingEvidence: string[];
    challengingEvidence: string[];
    sources: string[];
    evidenceQuality: string;
  };
  userStats: {
    pointsEarned: number;
    newLevel: string;
    achievements: string[];
    leaderboardRank: number;
  };
}

export const CitizenValidator = () => {
  const [claim, setClaim] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [result, setResult] = useState<ValidationResult | null>(null);
  const { toast } = useToast();

  const handleValidation = async () => {
    if (!claim.trim()) {
      toast({
        title: "⚠️ Claim Required",
        description: "Please enter a claim to validate",
        variant: "destructive"
      });
      return;
    }

    setIsValidating(true);
    
    toast({
      title: "🧠 AI Verification Starting",
      description: "Running comprehensive fact-checking analysis...",
    });

    try {
      console.log('🚀 Starting citizen validation:', claim);
      
      const response = await threatsApi.verify({ 
        claim, 
        userId: `citizen_${Date.now()}`
      });
      
      if (response.data.success) {
        setResult(response.data);
        toast({
          title: "✅ Validation Complete!",
          description: `Earned ${response.data.userStats.pointsEarned} points! New level: ${response.data.userStats.newLevel}`,
        });
        console.log('✅ Citizen validation completed:', response.data);
      } else {
        throw new Error(response.data.error || 'Validation failed');
      }
      
    } catch (error: any) {
      console.error('🚨 Citizen validation error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Validation system failure';
      
      toast({
        title: "❌ Validation Failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsValidating(false);
    }
  };

  const getVerdictColor = (verdict: string) => {
    if (verdict.includes('Likely True')) return 'text-green-400';
    if (verdict.includes('Highly Credible')) return 'text-emerald-400';
    if (verdict.includes('Questionable')) return 'text-red-400';
    if (verdict.includes('Mixed')) return 'text-yellow-400';
    return 'text-blue-400';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-cyan-400 neon-text mb-2">
            🛡️ Citizen Threat Validator
          </h1>
          <p className="text-muted-foreground text-lg">
            Earn points by validating threats with AI-powered fact-checking
          </p>
        </motion.div>

        {/* Validation Interface */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="cyber-card p-6"
        >
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-cyan-400 mb-2 block">
                Threat Claim to Validate
              </label>
              <Textarea
                value={claim}
                onChange={(e) => setClaim(e.target.value)}
                placeholder="e.g., Reports suggest China has deployed new military assets near Taiwan in response to recent diplomatic tensions..."
                className="min-h-[120px] bg-slate-900/50 border-cyan-500/30 focus:border-cyan-500 text-foreground"
              />
            </div>

            <Button 
              onClick={handleValidation}
              disabled={isValidating || !claim.trim()}
              className="cyber-button w-full"
            >
              {isValidating ? (
                <>
                  <Brain className="w-4 h-4 mr-2 animate-spin" />
                  Running AI Validation...
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4 mr-2" />
                  Validate with AI
                </>
              )}
            </Button>
          </div>
        </motion.div>

        {/* Validation Results */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* User Stats & Gamification */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <motion.div 
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="cyber-card p-4 text-center"
                >
                  <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                  <div className="text-2xl font-bold text-yellow-400">
                    +{result.userStats.pointsEarned}
                  </div>
                  <div className="text-sm text-muted-foreground">Points Earned</div>
                </motion.div>

                <motion.div 
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="cyber-card p-4 text-center"
                >
                  <Star className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                  <div className="text-lg font-bold text-purple-400">
                    {result.userStats.newLevel}
                  </div>
                  <div className="text-sm text-muted-foreground">Current Level</div>
                </motion.div>

                <motion.div 
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="cyber-card p-4 text-center"
                >
                  <Target className="w-8 h-8 mx-auto mb-2 text-orange-400" />
                  <div className="text-2xl font-bold text-orange-400">
                    #{result.userStats.leaderboardRank}
                  </div>
                  <div className="text-sm text-muted-foreground">Leaderboard</div>
                </motion.div>

                <motion.div 
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="cyber-card p-4 text-center"
                >
                  <Award className="w-8 h-8 mx-auto mb-2 text-green-400" />
                  <div className="text-lg font-bold text-green-400">
                    {result.userStats.achievements.length}
                  </div>
                  <div className="text-sm text-muted-foreground">New Badges</div>
                </motion.div>
              </div>

              {/* Achievement Badges */}
              {result.userStats.achievements.length > 0 && (
                <Card className="cyber-card">
                  <CardHeader>
                    <CardTitle className="text-yellow-400">🏆 Achievements Unlocked!</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {result.userStats.achievements.map((achievement, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                        >
                          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50 px-3 py-1">
                            {achievement}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* AI Verification Results */}
              <Card className="cyber-card">
                <CardHeader>
                  <CardTitle className="text-cyan-400">🤖 AI Verification Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-slate-900/50 rounded-lg border border-cyan-500/30">
                    <div className={`text-xl font-bold ${getVerdictColor(result.verification.verdict)} mb-2`}>
                      {result.verification.verdict}
                    </div>
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="text-sm text-muted-foreground">
                        Confidence: {result.verification.confidence}%
                      </div>
                      <Progress value={result.verification.confidence} className="flex-1 max-w-xs" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {result.verification.reasoning}
                    </p>
                  </div>

                  {/* Evidence Analysis */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-green-400">✅ Supporting Evidence</h4>
                      {result.verification.supportingEvidence.map((evidence, index) => (
                        <div key={index} className="p-2 bg-green-500/10 rounded border border-green-500/20">
                          <p className="text-sm text-green-300">{evidence}</p>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-red-400">❌ Challenging Evidence</h4>
                      {result.verification.challengingEvidence.map((evidence, index) => (
                        <div key={index} className="p-2 bg-red-500/10 rounded border border-red-500/20">
                          <p className="text-sm text-red-300">{evidence}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sources */}
                  <div>
                    <h4 className="font-semibold text-cyan-400 mb-3">📚 Intelligence Sources</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.verification.sources.map((source, index) => (
                        <Badge 
                          key={index}
                          variant="outline"
                          className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
                        >
                          {source}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
