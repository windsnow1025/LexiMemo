import * as React from 'react';
import { useRouter } from 'next/router'; // 导入 useRouter 钩子
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';

const filter = createFilterOptions();

export default function AutocompleteAdmin() {
    const router = useRouter(); // 使用 useRouter 钩子获取 router 对象
    const [value, setValue] = React.useState(null);

    const handleSelection = (event, newValue) => {
        if (newValue && newValue.title) {
            let path = '/admin/';
            switch (newValue.title) {
                case '主页':
                    path += '';
                    break;
                case '用户管理':
                    path += 'user';
                    break;
                case '单词管理':
                    path += 'word';
                    break;
                case '词书管理':
                    path += 'dictionary';
                    break;
                default:
                    break;
            }
            // 执行页面导航操作，跳转到相应路径
            router.push(path);
        }
    };

    return (
        <Autocomplete
            value={value}
            onChange={handleSelection} // 使用自定义的事件处理程序
            filterOptions={(options, params) => {
                const filtered = filter(options, params);

                const { inputValue } = params;
                const isExisting = options.some((option) => inputValue === option.title);
                if (inputValue !== '' && !isExisting) {
                    filtered.push({
                        inputValue,
                        title: `Add "${inputValue}"`,
                    });
                }

                return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id="free-solo-with-text-demo"
            options={top100Films}
            getOptionLabel={(option) => option.title}
            renderOption={(props, option) => <li {...props}>{option.title}</li>}
            sx={{ width: 300 }}
            freeSolo
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Search..."
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {params.InputProps.endAdornment}
                                <SearchIcon color="action" />
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}

const top100Films = [
    { title: '主页' },
    { title: '用户管理' },
    { title: '单词管理' },
    { title: '词书管理' }
];
