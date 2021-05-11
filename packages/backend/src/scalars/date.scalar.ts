import { CustomScalar, Scalar } from "@nestjs/graphql";
import { Kind, ValueNode } from "graphql";

@Scalar("Date", (type) => Date)
export class DateScalar implements CustomScalar<number, Date> {
  description = "Date custom scalar type";

  serialize(value: Date): number {
    return value.getTime() / 1000; // value sent to the client
  }

  parseValue(value: number): Date {
    return new Date(value); // value from the client
  }

  parseLiteral(ast: ValueNode): Date {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }
    throw Error("parseLiteral");
  }
}
