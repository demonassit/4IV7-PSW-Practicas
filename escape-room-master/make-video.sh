#!/bin/bash

avconv -i HBO%02d.png -r 30 -c:v h264 HBO.mp4
