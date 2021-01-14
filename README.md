# UnityRuntimeImport

## What is this project?

As the name suggests, this project aims to provide simple animation import with Unity in runtime.

The project consists of 2 parts, namely
1. A Series of C# scripts that are to be compiled into an existing Unity project to achieve runtime animation import with a specific animation format which has a similar data structure to a CSV file.
2. A simple animation editor and previewer, that should be easy enough to use, to edit and preview this specific animation file.

## Installation

### C# Scripts
The scripts needed for a local installation can be found in `Scripts/`.
Copy all the scripts to your Unity project at `PATH_TO_PROJECT/Asset/Scripts/`.

The `LoadAnim.cs` script should be attached to a custom animation controller object in Unity.

The `AnimationObj.cs` is the animation object to be initialized and controlled, so attach it to an object you would like to animate.

It should work out of the box after setting `Path to animation file`, and check `Parse Data` for the custom controller.

### View and Editor

*Still underdevelopment, not all functions work properly*

Is implemented as a web app, should work directly by running index.html. Is undergoing some changes, and may have a launcher in the future.

## Animation format.

The custom animation format is modified from tradition CSV format.

irst frame of an animation (sets the object slots and hierarchy) for a total of 14 commas:

ID (unique number of the object, starts at 1).  
SlotName. 
AnimationName (name of the animation).  
ChildOf (ID that we are children of, 0 if none).  
FrameTime in ms (useful for a "smoothing time" if not 0).  
Instant (0 for smooth animation between values, 1 if it changes instantly on the frame).  
Position X,Y,Z (relative to parent if ChildOf > 0).  
Rotation X,Y,Z (relative to parent if ChildOf > 0).  
Scale X,Y,Z (relative to parent if ChildOf > 0).   
eg:  
1,Head,Default,0,0,0,0,0,0,0,0,0,1,1,1.  

Later frames of animation can be just 12 commas for:  
ID.  
AnimationName.  
FrameTime in ms.  
Instant.  
Position X,Y,Z (relative to parent if ChildOf > 0).  
Rotation X,Y,Z (relative to parent if ChildOf > 0).  
Scale X,Y,Z (relative to parent if ChildOf > 0).  
eg:   
1,Default,1000,0,1,0,0,0,0,1,1,1.  

Animating variables can be done by looking at 4 commas:   
VariableName  
AnimationName  
FrameTime in ms  
Instant (jumps to this value at the frame exactly rather than smoothly)  
Value  
eg: Turn the lights on after 1 second  
LightsOn,EngineOn,0,1,0  
LightsOn,EngineOn,1000,1,1  

Configuring animations can be done with 3 commas:
AnimationName  
Loop  
GoToAnim the animation to go to on end (NA for none)  
eg:  
Default,1,NA  

--------------------------------------------------------------------  
Example animation:
--------------------------------------------------------------------  
1,Head,Default,0,0,0,0,0,0,0,0,0,1,1,1  
2,Hat,Default,1,0,0,0,0,0,0,0,0,1,1,1  
1,Default,1000,0,0,1,0,0,0,0,1,1,1  
1,Default,2000,0,0,0,0,0,0,0,1,1,1  

## Examples
There is a sample unity project that can be found in `SampleProject/`, it should run can compile for Unity version 2019.4.8f1 or above.  
A sample animation file can be found in `SampleProject/Assets/StreamingAssets/SampleAnim.txt`.


