import { useIntl } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

const Footer = () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: '西安市临潼区秦唐大道48号',
  });
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'Dust Monitor',
          title: '粉尘监测',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://gitee.com/Kevin_Bian',
          blankTarget: true,
        },
        {
          key: 'Smart mine',
          title: '智慧矿山',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
