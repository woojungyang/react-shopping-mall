import { enumerate } from "utilities/enumeration";

export const QuestionState = enumerate({
  Pending: 1,
  Complete: 2,
});

export function getQuestionStateLabel(state = 1) {
  return state === QuestionState.Pending ? "답변 대기" : "답변 완료";
}
