import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from '@/components/ui/use-toast';

type MarketTime = 'day' | 'night';

type ThemeContextType = {
    theme: MarketTime;
    setTheme: (theme: MarketTime) => void;
    toggleTheme: () => void;
    isDayMarket: boolean;
    isNightMarket: boolean;
    isMarketOpen: boolean;
    currentTime: Date;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setThemeState] = useState<MarketTime>('day');
    const [currentTime, setCurrentTime] = useState<Date>(new Date());
    const [isMarketOpen, setIsMarketOpen] = useState<boolean>(true);

    // Helper to apply dark mode class
    const applyThemeClass = (marketType: MarketTime) => {
        if (marketType === 'night') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    // Determine if the market is open based on time
    const determineMarketAvailability = (date: Date): {
        marketType: MarketTime;
        isOpen: boolean;
    } => {
        const hours = date.getHours();

        // DayMarket: 8 AM - 8 PM
        if (hours >= 8 && hours < 20) {
            return { marketType: 'day', isOpen: true };
        }

        // NightMarket: 8:30 PM - 6 AM
        if ((hours >= 20 && hours < 24) || (hours >= 0 && hours < 6)) {
            return { marketType: 'night', isOpen: true };
        }

        // Market is closed between 6 AM - 8 AM
        return { marketType: 'day', isOpen: false };
    };

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            setCurrentTime(now);

            const { marketType, isOpen } = determineMarketAvailability(now);

            // If theme changes, apply it
            if (marketType !== theme) {
                setThemeState(marketType);
                applyThemeClass(marketType);

                toast({
                    title: marketType === 'day' ? 'DayMarket is now open!' : 'NightMarket is now open!',
                    description: marketType === 'day'
                        ? 'Campus-wide trading is now available.'
                        : 'Hostel-restricted trading is now available.',
                });
            }

            setIsMarketOpen(isOpen);
        }, 60000);

        // Initial mount logic
        const { marketType, isOpen } = determineMarketAvailability(currentTime);
        setThemeState(marketType);
        applyThemeClass(marketType);
        setIsMarketOpen(isOpen);

        return () => clearInterval(timer);
    }, [theme]);

    const setTheme = (newTheme: MarketTime) => {
        setThemeState(newTheme);
        applyThemeClass(newTheme);
    };

    const toggleTheme = () => {
        const newTheme = theme === 'day' ? 'night' : 'day';
        setTheme(newTheme);
    };

    const value: ThemeContextType = {
        theme,
        setTheme,
        toggleTheme,
        isDayMarket: theme === 'day',
        isNightMarket: theme === 'night',
        isMarketOpen,
        currentTime,
    };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};



