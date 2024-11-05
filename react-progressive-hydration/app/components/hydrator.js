import React from "react";
import ReactDOM from "react-dom";

function interopDefault(mod) {
  return (mod && mod.default) || mod;
}

export function ServerHydrator({ load, ...props }) {
  const Child = interopDefault(load());
  return (
    <section>
      <Child {...props} />
    </section>
  );
}

export class Hydrator extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    new IntersectionObserver(
      async ([entry], obs) => {
        if (!entry.isIntersecting) return;
        obs.unobserve(this.root);

        const { load, ...props } = this.props;
        const Child = interopDefault(await load());
        if (props.allowHydration) {
          ReactDOM.hydrate(<Child {...props} />, this.root);
          console.log(`Hydrate Start by ${props.profile.name}`);
        }
      },
      {
        rootMargin: "-200px 0px",
        threshold: 0,
      }
    ).observe(this.root);
  }

  render() {
    return <section ref={(c) => (this.root = c)} dangerouslySetInnerHTML={{ __html: "" }} suppressHydrationWarning />;
  }
}
