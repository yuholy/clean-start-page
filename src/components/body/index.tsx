// @ts-ignore
import { Input } from "tdesign-react";
import SearchIcon from "./components/search-icons";

import { useEffect, useState } from 'react';
import { SearchEngineType } from "./components/search-icons";
interface SearchEngine {
    key: SearchEngineType;
    url: string;
}
const Body = () => {
    const [engineType, setEngineType] = useState<SearchEngineType>('google');
    const [searchValue, setSearchValue] = useState('');

    // 添加IP判断逻辑
    useEffect(() => {
        const checkLocation = async () => {
            try {
                // 替换为 ipinfo.io 的请求
                const response = await fetch('https://ipinfo.io/json?token=fdeb03a66f4583');
                const data = await response.json();
                setEngineType(data.country === 'CN' ? 'bing' : 'google');
            } catch (error) {
                console.error('IP检测失败，使用默认搜索引擎:', error);
                setEngineType('bing');
            }
        };
        checkLocation();
    }, []); // 保持空依赖数组，仅在组件挂载时执行

    // 保持原有 engines 数组不变
    const engines: SearchEngine[] = [
        { key: 'google', url: 'https://www.google.com/search?q=aa&oq=aa' },
        { key: 'bing', url: 'https://www.bing.com/search?q=a' },
        { key: 'baidu', url: 'https://www.baidu.com/s?wd=a' }
    ];

    const handleSearch = () => {
        const currentEngine = engines.find(engine => engine.key === engineType);
        if (currentEngine && searchValue.trim()) {
            const searchUrl = currentEngine.url.replace('q=a', `q=${encodeURIComponent(searchValue)}`);
            window.open(searchUrl, '_blank');
        }
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Tab') {
                event.preventDefault();
                setEngineType((prev: SearchEngineType) => {
                    const currentIndex = engines.findIndex(engine => engine.key === prev);
                    const nextEngine = engines[(currentIndex + 1) % engines.length];
                    return nextEngine.key;
                });
            }
            if (event.key === 'Enter') {
                event.preventDefault();
                handleSearch();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [searchValue]); // 添加 searchValue 依赖

    return (
        <main className="flex-grow mt-[12%]">
            <div className="container mx-auto flex flex-col items-center justify-center h-full">
                <div className="p-8  w-full max-w-2xl">
                    <div className="flex">
                        <Input
                            value={searchValue}
                            onChange={(value: string) => setSearchValue(value)}
                            prefixIcon={<SearchIcon type={engineType} />}
                            autofocus
                            clearable
                            align="left"
                            size="large"
                            status="default"
                            type="text"
                            onEnter={handleSearch}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Body;