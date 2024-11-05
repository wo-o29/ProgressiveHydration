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
        if (!entry.isIntersecting) return; // 뷰포트에 진입하지 않으면 early return
        obs.unobserve(this.root); // 관찰 중지

        const { load, ...props } = this.props;
        const Child = interopDefault(await load()); // 컴포넌트 로드
        if (props.allowHydration) {
          ReactDOM.hydrate(<Child {...props} />, this.root); // 컴포넌트 hydrate
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
    return <section ref={(c) => (this.root = c)} dangerouslySetInnerHTML={{ __html: "" }} />;
  }
}
