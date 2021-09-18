import { Colors, Loading } from '@cig-platform/ui';

import { StyledLoading } from './LoginLoading.styles';

export default function LoginLoading() {
  return (
    <StyledLoading data-testid="login-loading">
      <Loading color={Colors.DarkGreyBlue} />
    </StyledLoading>
  );
}
