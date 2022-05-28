// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { alea, xor128 } from "seedrandom";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type RandomIntOpt = {
  seed?: string;
  inclusive?: boolean;
};

export default class {
  private seed!: string;
  private rndFnc!: () => number;

  constructor(seed?: string) {
    if (!!seed) {
      this.seed = seed;
    }
  }

  private randomFunction(): () => number {
    if (!this.rndFnc) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.rndFnc = this.seed ? new alea(this.seed).double : Math.random;
    }
    return this.rndFnc;
  }

  public string(length: number): string {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(this.randomFunction()() * charactersLength));
    }
    return result;
  }

  public max(max: number, inclusive?: boolean): number {
    return this.range(0, max, inclusive);
  }

  public range(min: number, max: number, inclusive: boolean = true): number {
    min = Math.ceil(min || 0);
    max = Math.floor(max);
    return Math.floor((this.randomFunction()() as never) * (max - min + (inclusive ? 0 : 0)) + min);
  }

  public double(): number {
    return this.randomFunction()();
  }
}
