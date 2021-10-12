class EulerVector {
  public x0: number;
  public x1: number;
  public x2: number;
  constructor(x0: number, x1: number, x2: number) {
    this.x0 = x0;
    this.x1 = x1;
    this.x2 = x2;
  }

  ComputeOneEulerStep(m: number, af: number, f: number, dt: number): void {
    this.x2 = (f - af * this.x1) / m;
    this.x1 += this.x2 * dt;
    this.x0 += this.x1 * dt;
  }

  clearMotion(): void {
    this.x1 = 0;
    this.x2 = 0;
  }

  clear(): void {
    this.x0 = 0;
    this.x1 = 0;
    this.x2 = 0;
  }
}

export default EulerVector;
