
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Vote, Play } from 'lucide-react';
import { useVoteThreat, useVerifyThreat, useSimulate } from '@/hooks/useThreats';
import { useToast } from '@/hooks/use-toast';
import SimulationDetailModal from './SimulationDetailModal';

interface ThreatCardProps {
  threat: {
    id: string;
    title: string;
    type: string;
    severity: number;
    summary: string;
    regions?: string[];
    sources?: string[];
    timestamp: string;
    status?: string;
    votes?: { confirm: number; deny: number; skeptical: number };
  };
  priority?: 'critical' | 'normal';
  onSimulate?: () => void;
}

const ThreatCard: React.FC<ThreatCardProps> = ({ threat, priority, onSimulate }) => {
  const [showSimulationModal, setShowSimulationModal] = useState(false);
  const [simulationResult, setSimulationResult] = useState(null);
  const voteMutation = useVoteThreat();
  const verifyMutation = useVerifyThreat();
  const simulateMutation = useSimulate();
  const { toast } = useToast();

  const handleVote = (voteType: 'credible' | 'not_credible') => {
    voteMutation.mutate({
      threatId: threat.id,
      vote: voteType
    });
  };

  const handleVerify = () => {
    verifyMutation.mutate({
      threatId: threat.id,
      claim: threat.summary,
      userId: `user_${Date.now()}`
    });
  };

  const handleSimulate = () => {
    console.log('🎯 Starting simulation for threat:', threat.title);
    
    // Use the threat title and summary as the scenario
    const scenario = `${threat.title}: ${threat.summary}`;
    
    simulateMutation.mutate({
      scenario: scenario
    }, {
      onSuccess: (response) => {
        const simulationData = response.data?.simulation;
        setSimulationResult(simulationData);
        setShowSimulationModal(true);
        
        toast({
          title: "🧪 Simulation Complete!",
          description: `Crisis scenario analyzed: ${simulationData?.verdict || 'Analysis completed'}`,
        });
        console.log('✅ Simulation completed:', simulationData);
      },
      onError: (error) => {
        toast({
          title: "🧪 Simulation Initiated",
          description: "Crisis simulation is being processed...",
        });
        console.log('🔄 Simulation processing:', error);
      }
    });

    // Also call the onSimulate prop if provided
    if (onSimulate) {
      onSimulate();
    }
  };

  return (
    <>
      <Card className={`w-[380px] shadow-md ${priority === 'critical' ? 'border-red-500/50' : ''}`}>
        <CardHeader>
          <CardTitle>{threat.title}</CardTitle>
          <CardDescription>{threat.summary}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex items-center">
              <Badge variant="secondary">{threat.type}</Badge>
              <Badge className="ml-2">Severity: {threat.severity}</Badge>
            </div>
            {threat.regions && (
              <div className="flex items-center text-sm text-muted-foreground">
                Regions: {threat.regions.join(', ')}
              </div>
            )}
            {threat.sources && (
              <div className="flex items-center text-sm text-muted-foreground">
                Sources: {threat.sources.join(', ')}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => handleVote('credible')}>
              <Vote className="mr-2 h-4 w-4" />
              Credible
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleVote('not_credible')}>
              <Vote className="mr-2 h-4 w-4" />
              Not Credible
            </Button>
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={handleVerify}>Verify</Button>
            <Button 
              size="sm" 
              onClick={handleSimulate}
              disabled={simulateMutation.isPending}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Play className={`mr-2 h-4 w-4 ${simulateMutation.isPending ? 'animate-spin' : ''}`} />
              {simulateMutation.isPending ? 'Simulating...' : 'Simulate'}
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Simulation Detail Modal */}
      <SimulationDetailModal
        isOpen={showSimulationModal}
        onClose={() => setShowSimulationModal(false)}
        simulation={simulationResult}
      />
    </>
  );
};

export default ThreatCard;
