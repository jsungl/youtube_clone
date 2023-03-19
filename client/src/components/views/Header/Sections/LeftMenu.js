import { Menu } from 'antd';

export default function LeftMenu(props) {
    
    const items = [
        {
            label: (
                <a href="/">Home</a>
            ),
            key: 'mail',
        },
        {
            label: 'Blogs',
            key: 'SubMenu',
            children: [
                {
                  type: 'group',
                  label: 'Item 1',
                  children: [
                    {
                      label: 'Option 1',
                      key: 'setting:1',
                    },
                    {
                      label: 'Option 2',
                      key: 'setting:2',
                    },
                  ],
                },
                {
                  type: 'group',
                  label: 'Item 2',
                  children: [
                    {
                      label: 'Option 3',
                      key: 'setting:3',
                    },
                    {
                      label: 'Option 4',
                      key: 'setting:4',
                    },
                  ],
                },
            ],
        },
    ];

    return (
        <Menu mode={props.mode} items={items} />
    );

}