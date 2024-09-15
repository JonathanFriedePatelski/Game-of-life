
# Game of Life Project Plan

## Introduction

This document outlines the plans for building an enhanced version of the "Game of Life," initially described by mathematician John Conway in 1970. The goal is to create a versatile and interactive platform that allows users to explore the classic Game of Life and experiment with variations in the rules, visualizations, and patterns.

## Target Users

- **General Users**: Individuals interested in exploring the Game of Life and experimenting with different rule sets and patterns.
- **Researchers and Enthusiasts**: Users who are interested in analyzing the behavior of different patterns over time and exploring the effects of custom rules.

## Scope

### Must Have:

- **Game Initialization**: Users should be able to create an initial configuration of live cells on the grid and start the simulation.
- **Standard Rules Implementation**: The basic rules of Conway’s Game of Life should be implemented, allowing the game to progress through generations based on the initial configuration.
- **Interactive UI**: A user-friendly interface that allows users to draw patterns, start/stop the simulation, and reset the grid.
- **Visualization**: The ability to visualize the evolution of the grid over time, including the ability to adjust the speed of the simulation.

### Should Have:

- **Pattern Library**: A set of pre-defined patterns (e.g., gliders, oscillators) that users can quickly load and experiment with.
- **Save and Load Configurations**: Users should be able to save their configurations and load them later to continue their exploration.
- **Statistics and Data Analysis**: Provide real-time statistics about the grid, such as the number of live cells over time, and allow users to export this data for further analysis.

### Could Have:

- **Community Features**: An online repository where users can share their custom rule sets and patterns with others.
- **Mobile Support**: A mobile-friendly version of the application that allows users to explore the Game of Life on their smartphones or tablets.

## Timeline

- **Day 1**: Complete project setup, including version control (BitLab), environment configuration, and initial repository creation.
- **Day 2**: Develop a simple frontend interface and set up the database structure.
- **Day 3**: Implement the core simulation for the Game of Life and enhance the frontend with additional options.
- **Day 4**: Prepare a working prototype, improve the frontend UI/UX, and complete backend features like saving configurations.
- **Day 5**: Finalize remaining tasks on the scrumboard, polish the project, and prepare for the final presentation.

## Planning

| Day: | Task:                             | Team members:         | Deliverable:                                   |
| :--- | :-------------------------------- | :-------------------- | :--------------------------------------------- |
| 1    | Project setup                     | Nick | Repository setup, Project Plan, Readme, userstories    |
| 1    | Initial UI Design and Database Setup | Jonathan           | Simple frontend Design               |
| 2    | Core Simulation Implementation     | Nick, Christian             | Game of Life simulation                         |
| 2    | Enhance Frontend                  |                   | Additional frontend options                    |
| 3    | Prototype Development             |   | Functional prototype                           |
| 4    | Polish UI and Prepare Presentation |   Jonathan             | Polished UI, project presentation              |

## Technical Implementation

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: PHP
- **Data Handling**: JSON files or a simple database for saving/loading configurations and storing custom rules.
- **Version Control**: BitLab
