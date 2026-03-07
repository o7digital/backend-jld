'use client';

import { createNewsletterSubscriberRepository, listNewsletterSubscribersRepository } from '@/repositories/jld';
import type { JldNewsletterSubscriber, JldNewsletterSubscriberInput } from '@/types/jld';

export async function listNewsletterSubscribers(): Promise<JldNewsletterSubscriber[]> {
  return listNewsletterSubscribersRepository();
}

export async function createNewsletterSubscriber(
  input: JldNewsletterSubscriberInput,
): Promise<JldNewsletterSubscriber> {
  return createNewsletterSubscriberRepository(input);
}

export async function getNewsletterSummary() {
  const subscribers = await listNewsletterSubscribersRepository();
  const bySource = subscribers.reduce<Record<string, number>>((acc, subscriber) => {
    const source = subscriber.source || 'unknown';
    acc[source] = (acc[source] || 0) + 1;
    return acc;
  }, {});

  return {
    total: subscribers.length,
    consented: subscribers.filter((subscriber) => subscriber.consent).length,
    bySource: Object.entries(bySource)
      .map(([source, count]) => ({ source, count }))
      .sort((a, b) => b.count - a.count),
  };
}
