import { commandPrefix } from "./constants";

type FilteredCommands = {
  keyword: string;
  type: "only" | "after";
};

function filtered({ keyword, type }: FilteredCommands): RegExp {
  if (type === "only") {
    return new RegExp(`^${commandPrefix}${keyword}$`);
  }
  if (type === "after") {
    return new RegExp(`^${commandPrefix}${keyword}(.+)`);
  }

  throw new Error("Invalid type");
}

const commands = {
  greeting: filtered({ keyword: "halo", type: "only" }),
  hadistToday: filtered({ keyword: "hadits-today", type: "only" }),
  hadistLists: filtered({ keyword: "hadists-list", type: "only" }),
  help: filtered({ keyword: "help", type: "only" }),
};

export default commands;
