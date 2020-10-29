require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name         = "ReactNativeCameraKit"
  s.version      = package['version']
  s.summary      = package['description']
  s.license      = package['license']

  s.authors      = "CameraKit"
  s.homepage     = "https://github.com/teslamotors/react-native-camera-kit"
  s.platform     = :ios, "9.0"

  s.source       = { :git => "https://github.com/teslamotors/react-native-camera-kit.git", :tag => "v#{s.version}" }
  s.source_files  = "ios/**/*.{h,m}"

  s.dependency 'React-Core'
end
