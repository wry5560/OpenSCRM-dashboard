import { LeftOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { history } from '@umijs/max';

const MemberDetailInfo = (props: any) => {
    console.log(props.location.query)
    return (
        <PageContainer
            onBack={() => history.back()}
            backIcon={<LeftOutlined />}
            header={{
                title: '成员详情',
            }}
        >
        </PageContainer>
    )
}

export default MemberDetailInfo
