# Fan-out Timeline Technology (FTT)

**Audience: admins and the curious.**

Fan-out Timeline Technology (FTT) is the system Tribe uses to build your home timeline.

## What is fan-out?

When someone posts, there are two ways to deliver it to their followers:

**Fan-out on write (push model)** — at post time, the system writes the post ID into every follower's "home timeline cache". Fast reads, expensive writes.

**Fan-in on read (pull model)** — at read time, the system queries every account you follow for their recent posts and merges them. Cheap writes, expensive reads.

Tribe/Sharkey uses a **hybrid**: active accounts get fan-out (their home timeline is precomputed in Redis), inactive accounts get fan-in.

## Why this matters for admins

- **FTT has a memory cost.** Redis stores per-user timeline caches; more active users = more memory.
- **Slow posts are often due to fan-out**. If an account has 50k followers, that post has to be written into 50k home timelines. Tribe uses job queues to do this asynchronously.
- **The `deliverJobConcurrency` setting** in `.config/default.yml` controls how many fan-out jobs run in parallel.

## Tuning

If your instance feels slow:

1. Check Redis memory: `docker compose exec redis redis-cli INFO memory`.
2. Check the job queue: Admin → Job Queue.
3. Increase `deliverJobConcurrency` (default 128) if CPU and Redis have headroom.
4. Consider disabling FTT for inactive users older than N days.

## Further reading

- Upstream Sharkey docs: https://activitypub.software/TransFem-org/Sharkey
- Misskey architecture overview: https://misskey-hub.net (archive)
