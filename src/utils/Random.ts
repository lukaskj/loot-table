import { alea, xor128 } from 'seedrandom';

type RandomIntOpt = {
   seed?: string,
   inclusive?: boolean,
}

export default class {
   private seed: string;
   private rndFnc: () => number;

   constructor(seed?: string) {
      this.seed = seed;
   }

   private randomFunction(): () => number {
      if (!this.rndFnc) {
         // @ts-ignore
         this.rndFnc = !!this.seed ? new alea(this.seed).double : Math.random;
      }
      return this.rndFnc;
   }

   public string(length: number): string {
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;



      for (let i = 0; i < length; i++) {
         result += characters.charAt(Math.floor(this.randomFunction()() * charactersLength));
      }
      return result;


   }

   public max(max: number, inclusive?: boolean) {
      return this.range(0, max, inclusive);
   }

   public range(min: number, max: number, inclusive: boolean = true) {
      min = Math.ceil(min || 0);
      max = Math.floor(max);
      return Math.floor((this.randomFunction()() as any) * (max - min + (!!inclusive ? 0 : 0)) + min);
   }

   public double(): number {
      return this.randomFunction()();
   }
}