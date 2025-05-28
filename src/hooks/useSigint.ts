
import { useMutation } from '@tanstack/react-query';
import { threatsApi } from '../api/threats';
import { useToast } from '@/hooks/use-toast';

interface SigintResponse {
  data?: {
    threatsFound?: number;
    success?: boolean;
  };
}

export const useSigintScraping = () => {
  const { toast } = useToast();

  const rssScrapeMutation = useMutation({
    mutationFn: () => threatsApi.sigintApi.testRssScrape(),
    onSuccess: (response: SigintResponse) => {
      toast({
        title: "📡 RSS Scraping Complete",
        description: `Successfully scraped ${response.data?.threatsFound || 0} threats from RSS feeds`,
      });
    },
    onError: () => {
      toast({
        title: "❌ RSS Scraping Failed", 
        description: "Unable to connect to SIGINT RSS scraper",
        variant: "destructive",
      });
    }
  });

  const apiScrapeMutation = useMutation({
    mutationFn: () => threatsApi.sigintApi.testApiScrape(),
    onSuccess: (response: SigintResponse) => {
      toast({
        title: "🔗 API Scraping Complete",
        description: `Successfully scraped ${response.data?.threatsFound || 0} threats from API sources`,
      });
    },
    onError: () => {
      toast({
        title: "❌ API Scraping Failed",
        description: "Unable to connect to SIGINT API scraper", 
        variant: "destructive",
      });
    }
  });

  const htmlScrapeMutation = useMutation({
    mutationFn: () => threatsApi.sigintApi.testHtmlScrape(),
    onSuccess: (response: SigintResponse) => {
      toast({
        title: "🕸️ HTML Scraping Complete",
        description: `Successfully scraped ${response.data?.threatsFound || 0} threats from web sources`,
      });
    },
    onError: () => {
      toast({
        title: "❌ HTML Scraping Failed",
        description: "Unable to connect to SIGINT HTML scraper",
        variant: "destructive", 
      });
    }
  });

  const redditScrapeMutation = useMutation({
    mutationFn: () => threatsApi.sigintApi.testRedditScrape(),
    onSuccess: (response: SigintResponse) => {
      toast({
        title: "🟠 Reddit Scraping Complete", 
        description: `Successfully scraped ${response.data?.threatsFound || 0} threats from Reddit`,
      });
    },
    onError: () => {
      toast({
        title: "❌ Reddit Scraping Failed",
        description: "Unable to connect to SIGINT Reddit scraper",
        variant: "destructive",
      });
    }
  });

  return {
    scrapeRss: rssScrapeMutation.mutate,
    scrapeApi: apiScrapeMutation.mutate, 
    scrapeHtml: htmlScrapeMutation.mutate,
    scrapeReddit: redditScrapeMutation.mutate,
    isLoading: rssScrapeMutation.isPending || apiScrapeMutation.isPending || 
               htmlScrapeMutation.isPending || redditScrapeMutation.isPending
  };
};
