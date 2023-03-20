import "./CardSection.css";
import List, { ListType } from "../../List/List";
import { FC } from "react";
import Section from "../Section";
import SearchCardSkeleton from "../../../../components/Card/SearchCard/SearchCardSkeleton";

interface Props {
  title: string;
  type: ListType;
  isLoading: boolean;
  items: Array<any>;
  children: React.ReactNode;
  skeletonQuantity?: number;
  isImgCircle?: boolean;
  extraComponent?: React.ReactNode;
}
const CardSection: FC<Props> = ({
  title,
  type,
  isLoading,
  items,
  children,
  skeletonQuantity = 8,
  isImgCircle = false,
  extraComponent,
}) => {
  return isLoading || items?.length > 0 || extraComponent ? (
    <Section title={title}>
      {extraComponent}
      <List
        type={type}
        isLoading={isLoading}
        quantity={skeletonQuantity}
        skeleton={<SearchCardSkeleton isImgCircle={isImgCircle} />}
      >
        {children}
      </List>
    </Section>
  ) : null;
};

export default CardSection;
