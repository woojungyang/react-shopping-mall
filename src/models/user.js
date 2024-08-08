import { enumerate } from "utilities/enumeration";

export const userTokens = localStorage.getItem("tokens");

export const MembershipRank = enumerate({
  Basic: 1,
  Standard: 2,
  Select: 3,
  Premier: 4,
  Exclusive: 5,
});

export function getMembershipLabel(state) {
  switch (state) {
    case MembershipRank.Standard:
      return "Standard";
    case MembershipRank.Select:
      return "Select";
    case MembershipRank.Premier:
      return "Premier";
    case MembershipRank.Exclusive:
      return "Exclusive";
    default:
      return "Basic";
  }
}
