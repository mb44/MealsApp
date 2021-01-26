import React from "react";
import { Platform, Text } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs"
import { Ionicons } from "@expo/vector-icons";

import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";

import Colors from "../constants/Colors";

import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import FiltersScreen from "../screens/FiltersScreen";

const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "white"
    },
    headerTitleStyle: {
        fontFamily: "open-sans-bold"
    },
    headerBackTitleStyle: {
        fontFamily: "open-sans"
    },
    headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
    headerTitle: "A Screen"
};

const MealsNavigator = createStackNavigator({
    Categories: { 
        screen: CategoriesScreen
    },
    CategoryMeals: { 
        screen: CategoryMealsScreen
    },
    MealDetail: { 
        screen: MealDetailScreen 
    }}, {
    defaultNavigationOptions: defaultStackNavOptions
});

const FavNavigator = createStackNavigator({
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen
}, {
    defaultNavigationOptions: defaultStackNavOptions
});

const tabScreenConfig = {
    Meals: { 
        screen: MealsNavigator, 
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />;
            },
            tabBarColor: Colors.primaryColor,
            tabBarLabel: Platform.OS==="android" ? <Text style={{fontFamily: "open-sans-bold"}}>Meals</Text> : "Meals"
        }},
    Favorites: { 
        screen: FavNavigator, 
        navigationOptions: {
            tabBarLabel: "Favorites!",
            tabBarIcon: (tabInfo) => {
                return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />;
            },
            tabBarColor: Colors.accentColor,
            tabBarLabel: Platform.OS==="android" ? <Text style={{fontFamily: "open-sans-bold"}}>Favorites</Text> : "Favorites"
        }
    }
};

// The "root" navigator
const MealsFavTabNavigator = Platform.OS === "android" 
? createMaterialBottomTabNavigator(tabScreenConfig,
    {
        activeColor: "white",
        shifting: true,
        /*
        // Set the bar background colour when shifting=false
        barStyle: {
            backgroundColor: "red"
        }
        */
    }
)
: createBottomTabNavigator(
    tabScreenConfig,
    {
        tabBarOptions: {
            labelStyle: {
                fontFamily: "opens-sans-bold"
            },
            activeTintColor: Colors.accentColor
        }
    }
);

const FiltersNavigator = createStackNavigator({
    Filters: FiltersScreen
}, {
    defaultNavigationOptions: defaultStackNavOptions
});

const MainNavigator = createDrawerNavigator({
    MealsFavs: { 
        screen: MealsFavTabNavigator, 
        navigationOptions: {
            drawerLabel: "Meals"
        }
    },
    Filters: FiltersNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.accentColor,
        labelStyle: {
            fontFamily: "open-sans-bold",
            textAlign: "center"
        }
    }
});

export default createAppContainer(MainNavigator);