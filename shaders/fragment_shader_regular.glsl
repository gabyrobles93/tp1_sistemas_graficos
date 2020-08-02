precision highp float;
varying vec3 vNormal;
varying vec3 vPosWorld;

varying vec3 vPosSun;
varying vec3 vPosProjectile;
varying vec3 vPosTorch1;
varying vec3 vPosTorch2;
varying vec3 vColor;

varying vec2 vUv;

void main(void) {
    vec3 projectile_color = vec3(0.9137, 0.4588, 0.0392);
    float projectile_dist = distance(vPosProjectile, vPosWorld);
    float projectile_factor = 4.0/projectile_dist;

    vec3 torch_1_color = vec3(0.9137, 0.4588, 0.0392);
    float torch_1_dist = distance(vPosTorch1, vPosWorld);
    float torch_1_factor = 1.0/torch_1_dist;

    vec3 torch_2_color = vec3(0.9137, 0.4588, 0.0392);
    float torch_2_dist = distance(vPosTorch2, vPosWorld);
    float torch_2_factor = 1.0/torch_2_dist;

    float sun_dist = distance(vPosSun, vPosWorld);
    float sun_factor = 10.0/sun_dist;

    vec3 lightVec = normalize(vPosSun - vPosWorld);
    vec3 lightProjectile = normalize(vPosProjectile - vPosWorld);
    vec3 lightTorch1 = normalize(vPosTorch1 - vPosWorld);
    vec3 lightTorch2 = normalize(vPosTorch2 - vPosWorld);

    vec3 color = sun_factor * dot(lightVec, vNormal) +
                 projectile_factor * projectile_color * dot(lightProjectile, vNormal) +
                 torch_1_factor * torch_1_color * dot(lightTorch1, vNormal) +
                 torch_2_factor * torch_2_color * dot(lightTorch2, vNormal) +
                 0.5 * vColor;

    gl_FragColor = vec4(color, 1.0);
}