import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { cloneElement, ReactElement } from "react";

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  shouldMatchExactlyHref?: boolean;
}

export function ActiveLink({ children, shouldMatchExactlyHref = false, ...rest }: ActiveLinkProps) {
  const { asPath } = useRouter();
  
  let isActive = false;

  if (shouldMatchExactlyHref && (asPath === rest.href.toString() || asPath === rest.as.toString())) {
    isActive = true;
  }

  if (!shouldMatchExactlyHref && (asPath.startsWith(rest.href.toString()) || asPath.startsWith(rest.as.toString()))) {
    isActive = true;
  }

  return (
    <Link {...rest}>
      { cloneElement(children, {
        color: isActive ? "pink.400" : "gray.50"
      }) }
    </Link>
  );
}