// @flow
import * as React from 'react';
import { useAppSelector } from "@/src/hooks";
import { NextPageContext } from 'next';
import { userSlice } from '@/src/features/user.slice';

type Props = {};
const Hello = (props: Props) => {
  const name = useAppSelector(state => state.user.email)

  // console.log(props)

  return (
    <div>
      Hello {name}
    </div>
  );
};

Hello.getInitialProps = async (context: NextPageContext) => {

  await context.store.dispatch(userSlice.actions.updateName('test_updated@gmail.com'))

  return {name: 'Linh'}
}
export default Hello
