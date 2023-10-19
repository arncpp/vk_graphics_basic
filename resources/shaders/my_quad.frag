#version 450
#extension GL_ARB_separate_shader_objects : enable

layout(location = 0) out vec4 color;

layout (binding = 0) uniform sampler2D colorTex;

layout (location = 0 ) in VS_OUT
{
  vec2 texCoord;
} surf;

const int kernelSize = 3;

void sort(inout vec4 colors[kernelSize * kernelSize])
{
  for (int i = 0; i < kernelSize * kernelSize - 1; i++)
  {
    int minIndex = i;
    for (int j = i + 1; j < kernelSize * kernelSize - 1; j++)
    {
      if (colors[j].x + colors[j].y + colors[j].z < colors[minIndex].x + colors[minIndex].y + colors[minIndex].z)
      {
        minIndex = j;
      }
    }
    if (minIndex != i)
    {
      vec4 tmp = colors[minIndex];
      colors[minIndex] = colors[i];
      colors[i] = tmp;
    }
  }
}

void main()
{
  vec4 colors[kernelSize * kernelSize] = vec4[kernelSize * kernelSize](
    textureLodOffset(colorTex, surf.texCoord, 0, ivec2(-1, -1)),
    textureLodOffset(colorTex, surf.texCoord, 0, ivec2(-1, 0)),
    textureLodOffset(colorTex, surf.texCoord, 0, ivec2(-1, 1)),
    textureLodOffset(colorTex, surf.texCoord, 0, ivec2(0, -1)),
    textureLodOffset(colorTex, surf.texCoord, 0, ivec2(0, 0)),
    textureLodOffset(colorTex, surf.texCoord, 0, ivec2(0, 1)),
    textureLodOffset(colorTex, surf.texCoord, 0, ivec2(1, -1)),
    textureLodOffset(colorTex, surf.texCoord, 0, ivec2(1, 0)),
    textureLodOffset(colorTex, surf.texCoord, 0, ivec2(1, 1))
  );
	
	sort(colors);
	color = colors[4];
}