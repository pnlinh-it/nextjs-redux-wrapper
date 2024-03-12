// @flow
import * as React from 'react';
import {NextPageContext} from "next/dist/shared/lib/utils";
import {userSlice} from "@/store";
import {useAppSelector} from "@/hooks";

type Props = {};
const Hello = (props: Props) => {
    const name = useAppSelector(state => state.user.name)

    // console.log(props)

    return (
        <div>
            Hello {name}
        </div>
    );
};

Hello.getInitialProps = async (context: NextPageContext) => {

    await context.store.dispatch(userSlice.actions.updateName('Linh2'))

    return {name: ' awd'}
}
export default Hello