
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

interface TimelineEvent {
  date: string;
  action: string;
  user: string;
}

interface LoanTimelineCardProps {
  timeline: TimelineEvent[];
}

export function LoanTimelineCard({ timeline }: LoanTimelineCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="relative border-l border-muted-foreground/20 ml-3 space-y-6">
          {timeline.map((event, index) => (
            <li key={index} className="ml-6">
              <span className="absolute flex items-center justify-center w-6 h-6 bg-loan-light rounded-full -left-3 ring-8 ring-background">
                <div className="w-2.5 h-2.5 rounded-full bg-loan-primary"></div>
              </span>
              <h3 className="flex items-center mb-1 text-lg font-semibold">
                {event.action}
              </h3>
              <time className="block mb-2 text-sm font-normal leading-none text-muted-foreground">
                {formatDate(event.date)}
              </time>
              <p className="text-sm">
                By {event.user}
              </p>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}
