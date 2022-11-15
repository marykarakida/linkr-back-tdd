export abstract class Entity<T> {
  public readonly props;

  constructor(props: T) {
    this.props = props;
  }
}
