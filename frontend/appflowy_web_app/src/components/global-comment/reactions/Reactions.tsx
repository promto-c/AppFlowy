import { GlobalComment, Reaction as ReactionType } from '@/application/comment.type';
import { useGlobalCommentContext } from '@/components/global-comment/GlobalComment.hooks';
import Reaction from '@/components/global-comment/reactions/Reaction';
import React, { memo, useCallback, useMemo } from 'react';

export function Reactions({ comment }: { comment: GlobalComment }) {
  const { reactions, toggleReaction } = useGlobalCommentContext();
  const commentReactions = useMemo(() => {
    return reactions?.[comment.commentId]?.filter((reaction) => reaction.reactUsers.length > 0) || [];
  }, [reactions, comment.commentId]);

  const handleReactionClick = useCallback(
    (reaction: ReactionType) => {
      toggleReaction(comment.commentId, reaction.reactionType);
    },
    [comment.commentId, toggleReaction]
  );

  return (
    <div className={'flex w-full flex-wrap items-center gap-2 overflow-hidden'}>
      {commentReactions.map((reaction) => {
        return <Reaction reaction={reaction} onClick={handleReactionClick} key={reaction.reactionType} />;
      })}
    </div>
  );
}

export default memo(Reactions);
