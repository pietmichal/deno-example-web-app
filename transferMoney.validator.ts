export function transferMoneyValidator(
  body: any,
): { amount: number; from: string; to: string } {
  const validAmount = body.amount && typeof body.amount === "number" &&
    body.amount > 0;
  const validFrom = body.from && typeof body.from === "string";
  const validTo = body.to && typeof body.to === "string";
  const fromToNotEqual = body.from !== body.to;
  if (validAmount && validFrom && validTo && fromToNotEqual) {
    return body;
  }
  throw Error("Validation error");
}
