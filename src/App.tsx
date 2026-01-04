import {
  AppRoot,
  Callout,
  Code,
  ExternalLink,
  Link,
  NavSection,
  type CommonQuestion
} from "react-lib-tools";
import { html as flexboxHTML } from "../public/generated/examples/FaqFlexbox.json";
import { html as memoizationHTML } from "../public/generated/examples/FaqMemoization.json";
import { NavLink } from "./components/NavLink";
import { routes } from "./routes";

export default function App() {
  return (
    <AppRoot
      commonQuestions={commonQuestions}
      navLinks={
        <div>
          <NavLink path="/">Getting started</NavLink>
          <NavSection label="Examples">
            <NavLink path="/examples/child-component">Child component</NavLink>
            <NavLink path="/examples/render-prop">Render prop function</NavLink>
          </NavSection>
          <NavSection label="Props">
            <NavLink path="/props/auto-sizer">AutoSizer component</NavLink>
          </NavSection>
          <NavLink path="/common-questions">Common questions</NavLink>
          <NavLink path="/support">Support</NavLink>
        </div>
      }
      overview={
        <>
          <div>
            This package measures the available width and height of an{" "}
            <code>HTMLElement</code> and passes those values as props to a{" "}
            <code>ChildComponent</code> or <code>renderProp</code>. Refer to the{" "}
            <Link to="/examples/child-component">examples</Link> or{" "}
            <Link to="/props/auto-sizer">props</Link> pages for more
            information.
          </div>
          <Callout intent="primary">
            This package began as a fork of the <code>AutoSizer</code> component
            from{" "}
            <ExternalLink href="https://github.com/bvaughn/react-virtualized">
              react-virtualized
            </ExternalLink>
            , and was intended for use with earlier versions of{" "}
            <ExternalLink href="https://github.com/bvaughn/react-virtualized">
              react-window
            </ExternalLink>
            . More recent versions of <code>react-window</code> use{" "}
            <code>ResizeObserver</code> natively and do not require this
            package.
          </Callout>
        </>
      }
      packageDescription="(re)sizing helper component"
      packageName="react-virtualized-auto-sizer"
      routes={routes}
    />
  );
}

const commonQuestions: CommonQuestion[] = [
  {
    id: "flexbox",
    question: "Can I use this component with Flexbox?",
    answer: (
      <>
        <p>
          Flex containers don't prevent their children from growing and{" "}
          <code>AutoSizer</code> greedily grows to fill as much space as
          possible. Combining the two can be problematic. The simple way to fix
          this is to nest <code>AutoSizer</code> inside of a <code>block</code>{" "}
          element (like a <code>{"<div>"}</code>) rather than putting it as a
          direct child of the flex container, like so:
        </p>
        <Code html={flexboxHTML} />
      </>
    )
  },
  {
    id: "height-zero",
    question: "Why is height 0?",
    answer: (
      <>
        <p>
          <code>AutoSizer</code> expands to _fill_ its parent but it will not
          _stretch_ the parent. This is done to prevent problems with Flex
          layouts. If <code>AutoSizer</code> is reporting a height (or width) of
          0- then it's likely that the parent element (or one of its parents)
          has a height of 0.
        </p>
        <p>
          The solution to this problem is often to add <code>height: 100%</code>{" "}
          or <code>flex: 1</code> to the parent.
        </p>
        <Callout intent="primary">
          One easy way to test this is to add a style property (eg.{" "}
          <code>background-color: red;</code>) to the parent to visually confirm
          that it is the expected size.
        </Callout>
      </>
    )
  },
  {
    id: "only-width-or-height",
    question: (
      <>
        Can I use <code>AutoSizer</code> to observe <em>only</em> width or
        height (not both)?
      </>
    ),
    answer: (
      <>
        <p>
          No, but you can memoize your child component so that it only
          re-renders if width (or height) changes.
        </p>
        <Code html={memoizationHTML} />
      </>
    )
  },
  {
    id: "csp",
    question: "Can this component work with a Content Security Policy?",
    answer: (
      <>
        <p>
          The{" "}
          <ExternalLink href="https://www.w3.org/TR/2016/REC-CSP2-20161215/">
            Content Security Policy specification
          </ExternalLink>{" "}
          states:
        </p>
        <Callout minimal>
          Individual inline scripts and stylesheets may be whitelisted via
          nonces.
        </Callout>
        <p>
          To apply Content Security Policy nonce to <code>AutoSizer</code>, use
          the <code>nonce</code> prop and add a matching{" "}
          <code>nonce-source</code> to the <code>Content-Security-Policy</code>{" "}
          field in HTTP header.
        </p>
      </>
    )
  }
];
